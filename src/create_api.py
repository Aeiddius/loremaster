import os
import json

class Api:
  def __init__(self, path: str):
    self.path: str = path
    self.path_metadata = ".lore\\metadata.json"
    self.path_metadata_abs = path + self.path_metadata
   
  def start(self):
     self.metadata: dict = self.read_json(self.path_metadata)
     self.project_title = self.metadata["title"]
     self.isValid: bool = self.validate_metadata()

  def isValidProject(self):
    if not os.path.exists(self.path + "index.html"):
      return False
    return True

  def validate_metadata(self) -> bool:
    legal = [
      "title",
      "subtitle",
      "directory"
    ]
    for key in legal:
      if key not in self.metadata:
        return False
    
    if not isinstance(self.metadata["directory"], dict):
      return False
  
    mandatory_pages = [
      "nav", "404", "new", "add-page", "home"
    ]
    
    for page in mandatory_pages:
      if page not in self.metadata["directory"]:
        return False
      
    return True
  
  def savePage(self, OGPageId: str, newPage: dict, metaEntry: dict, isPageTemplate=False):
    """
    Save a page to a specified path as a JSON file and update metadata.

    Args:
      path (str): The base path where the JSON file will be saved.
      OGPageId (str): The original page ID.
      newPage (dict): The content of the new page as a dictionary.
      metaEntry (dict): Metadata entry associated with the new page.

    Returns:
      None
    """
    
    pageId: str = list(metaEntry.keys())[0]
    path = metaEntry[pageId]["path"]
    
    # Delte original entry if it has changed
    if pageId != OGPageId:
      OGPath: str = self.metadata["directory"][OGPageId]["path"]

      self.metadata["directory"].pop(OGPageId, None)      
      os.remove(self.createPath(OGPath, OGPageId, True))
    
    # Save newPage as json
    file_path = self.createPath(path, pageId)
    with open(file_path, "w", encoding="utf8") as outfile:
      outfile.write(json.dumps(newPage, ensure_ascii=False))
    
    # Save the updated metadata
    self.metadata["directory"][pageId] = metaEntry[pageId]
    if isPageTemplate == True:
      self.metadata["templates"].append(pageId)
    self.saveMetadata()
        
    # Print a message indicating successful saving
    print(f"{pageId}.json saved!")
        
        
  def deletePage(self, pageId):
    path: str = self.metadata["directory"][pageId]["path"]
    file_path: str = self.createPath(path, pageId)
    pass
  
  
  def createPath(self, path: str, pageId: str, isAbsPath: bool = False):

    # Clean page path by replacing forward slashes with backslashes and stripping whitespace
    if isAbsPath:
      # rehashed_path = path.replace("/", "\\").strip()      
      return self.path.replace("\\", "/").strip()  + path
        
    file_path = self.path + path
    return file_path
    
  
  def saveMetadata(self):
    with open(self.path_metadata_abs, "w", encoding="utf8") as outfile:
      outfile.write(json.dumps(self.metadata, indent=2, ensure_ascii=False))
    
    print("Saved Metadata")

  def read_json(self, file) -> dict:
    with open(self.path + file, "r", encoding="utf8") as f:
      return json.load(f)
    