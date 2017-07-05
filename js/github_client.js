//define functions here

let accessToken = '14eae06ffaca8c2527394247f46fe5a0aa6e8d90'

function submitCreateGistForm() {
  $('#createGist').on('submit', function (event) {
    let file_name = $('#file_name').val();
    let token = $('#token').val();
    let description = $('#description').val();
    let content = $('#content').val();
    createGist(file_name, content, description, token)
    event.preventDefault();
  })
}

var createGist = function (file_name, content, description, token) {
  let data = {
    'public': true,
    'description': description,
    'files': {}
  };

  data['files'][file_name] = {
    'content': content
  };



  $.ajax({
    url: 'https://api.github.com/gists',
    dataType: 'json',
    type: 'POST',
    headers: {
      Authorization: `token ${token}`
    },
    data: JSON.stringify(data)
  }).done(function (response) {
    myGists(response.owner.login, token);
  });



};

function submitMyGistsForm() {
  $('#myGistsForm').on('submit', function (event) {
    let username = $('#username').val();
    let token = $('#token').val();
    myGists(username, token)
    event.preventDefault();
  })
}

var myGists = function (username, token) {
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists?access_token=' + token,
    dataType: 'jsonp',
    success: (data) => {
      let array = data.data
      array.forEach(object => {
        //do something
        $('#results').append(`<p><a href=${object.html_url}>Link to ${object.description}</a></p>`)
      })
    }
  })


};

var bindCreateButton = function () {
  // call functions here

};

$(document).ready(function () {
  submitMyGistsForm()
  submitCreateGistForm()
});;
