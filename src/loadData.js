document.getElementById('file').onchange = function () {

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function (progressEvent) {
    newDataReceived(this.result);
  };
  reader.readAsText(file);
};