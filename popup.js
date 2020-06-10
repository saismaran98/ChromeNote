// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

document.getElementById('save').onclick = function(){
 // document.getElementById("list").innerHTML = document.getElementById("userNote").value;
 
  
  var noteList = document.createElement('p');
  var noteData = document.createTextNode(document.getElementById("userNote").value);
  console.log(noteList.appendChild(noteData));
  document.body.appendChild(noteList);
  chrome.storage.sync.set({"noteList":noteList},function(){});
 
  document.getElementById("userNote").value = ""
}
document.getElementById("getNotes").onclick = function(){
  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  })
};

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};
