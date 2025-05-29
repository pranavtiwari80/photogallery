# photogallery

Please follow the following to set it up on your local

Create a folder on local where you want to clone.
Clone the code in that folder.
Go to the folder and 
under src create environments folder
and create a file under it with name environment.ts
environment.ts (src/environments/environment.ts) and paste the following code there

export const environment = {
  production: false,
  flickrApiKey: '' //Add your flickrApiKey here
  
};

then go to your root folder of this clone on local and run the following command
npm install 

It will install all the dependencies.

then you can run

ng build

Once build is completed, run the following

ng serve

After successful completion, it will provide you a url, you can open the photogallery using that url.
