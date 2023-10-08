import webview
import sys
import subprocess
import json
import os

import shutil

# c = sys.argv[1]

class Api:

  def setup(self, window):
    self.window = window
    self.config = ""
    self.curr_selected_folder = ""
    
  def readConfig(self):
    with open("src/config.json", "r", encoding="utf8") as f:
      self.config = json.load(f)
  
  def saveConfig(self):
    with open("src/config.json", "w", encoding="utf8") as f:
      f.write(json.dumps(self.config, indent=2))
    
  def getRecent(self):
    if self.config == "":
      self.readConfig()
    return self.config["recent"]

  def getFolder(self):
    self.curr_selected_folder = self.window.create_file_dialog(webview.FOLDER_DIALOG)[0]
    return self.curr_selected_folder

  def removeCurFolder(self):
    self.curr_selected_folder = ""
    
  def createProject(self):
    if self.curr_selected_folder == "":
      return "Error"
    shutil.copytree('Project', self.curr_selected_folder, dirs_exist_ok=True)
    
    return "Done"
  
  
  def openFolder(self, path=""):

    if path == "":
      folder_path = self.window.create_file_dialog(webview.FOLDER_DIALOG)
      if folder_path == None:
        return
      
      with open(folder_path[0] + "\\.lore\\metadata.json" ) as f:
        meta = json.load(f)
        self.title = meta["title"]

        if self.title not in self.config["recent"]:
          self.config["recent"][self.title] = folder_path[0]
        
        self.saveConfig()
      
      # subprocess.call(f"create.exe \"{folder_path[0]}\"")
      subprocess.Popen(["create.exe", folder_path[0]])


    else:
      print(path)
      # subprocess.call(f"create.exe \"{path}\"")
      subprocess.Popen(["create.exe", path])
    

api = Api()
window = webview.create_window('Loremaster', "frontend/index.html",
                      js_api=api,
                      width=550,
                      height=500,
                      resizable=False)
webview.start(api.setup, window, http_server=True,
              debug=True)