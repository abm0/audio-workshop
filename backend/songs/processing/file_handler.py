import tempfile
import os
  
def file_handler(cls):
  def create_temp_file(self, file):
    temp_dir = tempfile.gettempdir()
    self.__temp_file_path = os.path.join(temp_dir, file.name)

    with open(self.__temp_file_path, 'wb+') as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)


    return self.__temp_file_path
  
  def destroy_temp_file(self):
    os.remove(self.__temp_file_path)
    
    
  cls.create_temp_file = create_temp_file
  cls.destroy_temp_file = destroy_temp_file
  return cls