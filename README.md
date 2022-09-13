# Welcome to QuicksPic


[QuicksPic](https://quickspic.herokuapp.com/) allows users to interact and socialize with others on the interweb. Users will be able to create their own personal profiles and communicate with others via posting, commenting, and liking each other's posts! Here is the [live Link](https://quickspic.herokuapp.com/)

## Splash Page
![image](https://user-images.githubusercontent.com/98856057/178869008-53531ffd-e86f-4d19-a69a-f041e0015821.png)


## SignUp Page
![image](https://user-images.githubusercontent.com/98856057/178869057-5e24ee62-31db-47d5-bd14-4571b068d0d7.png)


# Features
There are two MVP's that are the foundation for QuicksPic to Work. They are the Photos and the Comments.


## PhotoFeed
Want to be in the know and find out what's happening with your followers? Then go check out  the Photo Feed where you'll be able to see the people's posts and your posts as well! 
![image](https://user-images.githubusercontent.com/98856057/179322225-dd17e391-ac21-4d81-a161-282ec31e8dc9.png)

## Comments
Want to share your excitment? Why not leave a comment to let the person know how much you enjoyed their post! Don't forget to like and follow :)
![image](https://user-images.githubusercontent.com/98856057/179322246-611a4ae2-b699-4117-9371-c9e4ff5ab145.png)


## Technologies Used:
* Javascript
* Python
* Flask
* React
* Redux
* Docker
* SQLAlchemy
* PostgreSQL
* HTML
* CSS
* Heroku

## Future Features
Due to a time constraint of completing QuicksPic within a week and a half, I hope to include these features in the near future:
- Search/filters
- Profile Page
- Followers/Following Pages

## Technical Implementation Details
When creating QuicksPic, there were a lot of refractoring and changes needed to be done in order to fix the small bugs and errors that occurred. I think working on this project has deepened my knowledge of what an organized application can look like. Here is an example of the code that had to be refractored into different components.

```
 <PhotoLikesForm photo={photo} />
                {photo.photo_users !== 1 ?
                    <span className='like-container-photo'>{photo.photo_users} likes</span>
                    : <span className='like-container-photo'>
                        {photo.photo_users} like
                    </span>
                }
                </div>
                <div className='username-caption-container'>
                <div className='username-input'>{photo.username.username}</div>
                <span className='caption-input'>{photo.caption}</span>
                </div>
                <div className='createdAt-input'>{photo.createdAt}</div>
            </div>
            <div>
    
```

## Feature List:
In QuicksPic, there are two [features](https://github.com/ChrisPHong/QuicksPic/wiki/Feature-List) that you can interact with: Photos and Comments! As a logged in User, you can create your own photos, read your following photos, update your photos, and delete your photo. You can also create comments, edit your comments, delete your comments, and read any comment for that specified photo.



## React Components
React was used as the frontend in creating Squeals. Here is a list of the components that were used in order to create QuicksPic!
- CommentDisply
- CommentForm
- CommentLikesForm
- Comments
- EditCommentForm
- EditPhotoForm
- homePage
- LoginForm
- NavBar
- PhotoDisplay
- Photos
- Profile
- SignUpForm
And many more! 


## DataBase Schema
In order to create the backend, I used Flask in order to create the models, migrations, and seeders. Here is a link to the [database schema](https://github.com/ChrisPHong/QuicksPic/wiki/Database-Schema) used for QuicksPic.


## FrontEnd Routes
In order to navigate through QuicksPic, frontEnd Routes were needed to distinguish between which routes were used by certain components. These are the [FrontEnd Routes](https://github.com/ChrisPHong/QuicksPic/wiki/FrontEnd-Routes) that were used for [QuicksPic](https://quickspic.herokuapp.com/).
