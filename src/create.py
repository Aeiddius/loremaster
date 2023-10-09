import webview
import subprocess
import os
import argparse


from create_api import Api

invalid = """<html>
  <style>
    body {
      background-color: #2f2f2f;
      color: white;
      font-family: Calibri Light;
    }

    .container {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h1 {
      font-size: 40px;
    }
  </style>
  <body>
    <div class="container">
      <h1>This is not a valid project</h1>
    </div> 
  </body>
</html>"""
class GUI:
  
  def __init__(self):

    parser = argparse.ArgumentParser()
    parser.add_argument("path")
    args = parser.parse_args()
    path = args.path + "\\"

    self.api = Api(path)

    if self.api.isValidProject() == True:
      self.api.start()
      webview.create_window(self.api.project_title, path + "index.html",
                            js_api=self.api,
                            width=1080,
                            height=720,
                            resizable=True)
    else:
      webview.create_window('Hello world', html=invalid,
                            js_api=self.api,
                            width=550,
                            height=600,
                            resizable=False)
    webview.start(http_server=True,
                  debug=True)
    
    
if __name__ == "__main__":
  app = GUI()