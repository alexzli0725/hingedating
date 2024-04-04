const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://alexzli0725:alexzli0725@cluster0.ips8ryx.mongodb.net/',
  )
  .then(() => {
    console.log('Connected to MongoDb');
  })
  .catch(error => {
    console.log('Error connecting to MongoDb', error.message);
  });
app.listen(port, () => {
  console.log('Server running on 3000');
});

const User = require('./models/user');
const Chat = require('./models/message')
app.post('/register', async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req.body;

    // Create a new user using the User model
    const newUser = new User(userData);

    await newUser.save();

    const secretKey = crypto.randomBytes(32).toString('hex');

    // Generate a token for the new user (you may use JWT or any other token generation mechanism)
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: '1d',
    });
    // Return the new user data along with the token
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the user details' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists already
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    //check in password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalide password' });
    }

    const secretKey = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({ userId: user._id }, secretKey);

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'login failed' });
  }
});

app.get('/matches', async (req, res) => {
  try {
    const { userId } = req.query;

    // Fetch user's dating preferences and type
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let filter = {}; // Initialize filter as an empty object

    if (user.gender === 'Men') {
      filter.gender = 'Women';
    } else if (user.gender === 'Women') {
      filter.gender = 'Men';
    }

    // Construct query based on dating preferences and type
    let query = {
      _id: { $ne: userId },
    };

    // if (user.datingPreferences && user.datingPreferences.length > 0) {
    //   filter.datingPreferences = user.datingPreferences;
    // }
    if (user.type) {
      filter.type = user.type; // Assuming user.type is a single value
    }

    const currentUser = await User.findById(userId)
      .populate('matches', '_id')
      .populate('likedProfiles', '_id');

    // Extract IDs of friends
    const friendIds = currentUser.matches.map(friend => friend._id);

    // Extract IDs of crushes
    const crushIds = currentUser.likedProfiles.map(crush => crush._id);

    console.log('filter', filter);

    // Fetch matches based on query
    const matches = await User.find(filter)
      .where('_id')
      .nin([userId, ...friendIds, ...crushIds]);

    return res.status(200).json({ matches });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/like-profile', async (req, res) => {
  try {
    const { userId, likedUserId, image, comment } = req.body;
    await User.findByIdAndUpdate(likedUserId, {
      $push: {
        receivedLikes: {
          userId: userId,
          image: image,
          comment: comment,
        },
      },
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        likedProfiles: likedUserId,
      },
    });
    res.status(200).json({ message: 'Profile liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/received-likes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const likes = await User.findById(userId)
      .populate('receivedLikes.userId', 'firstName imageUrls prompts')
      .select('receivedLikes');
    res.status(200).json({ receivedLikes: likes.receivedLikes });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/create-match', async (req, res) => {
  try {
    const {currentUserId, selectedUserId} = req.body;

    //update the selected user's crushes array and the matches array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: {matches: currentUserId},
      $pull: {likedProfiles: currentUserId},
    });

    //update the current user's matches array recievedlikes array
    await User.findByIdAndUpdate(currentUserId, {
      $push: {matches: selectedUserId},
    });

    // Find the user document by ID and update the receivedLikes array
    const updatedUser = await User.findByIdAndUpdate(
      currentUserId,
      {
        $pull: {receivedLikes: {userId: selectedUserId}},
      },
      {new: true},
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
  }


    // If the user document was successfully updated
    res.status(200).json({message: 'ReceivedLikes updated successfully'});

  } catch (error) {
    res.status(500).json({message: 'Error creating a match', error});
  }
});

app.get("/get-matches/:userId",async(req,res) => {
  try{
    const {userId} = req.params;
    const user = await User.findById(userId).populate("matches","firstName imageUrls");
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    const matches = user.matches;
    res.status(200).json({matches})
  }catch(error){
    res.status(500).json({ message: 'Internal server error' });
  }
});

io.on('connection',socket => {
  console.log('a user is connected')
  socket.on('sendMessage',async data => {
    try{
      const {senderId, receiverId,message} = data;
      const newMessage = new Chat({senderId,receiverId,message});
      await newMessage.save();
      io.to(receiverId).emit('receiveMessage',newMessage)
    }catch(error){
      console.log('Error handling the messages')
    }

    socket.on('disconnect',() => {
      console.log("user disconnected")
    })
  })
})

http.listen(6000,() => {
  console.log("Socket.IO running on port 6000")
})

app.get("/messages",async(req,res) => {
  try{
    const {senderId,receiverId} = req.query;
    const messages = await Chat.find({
      $or:[
        {senderId:senderId,receiverId:receiverId},
        {senderId:receiverId,receiverId:senderId}
      ]
    }).populate('senderId','_id name')
    res.status(200).json(messages)
  }catch(error){
    res.status(500).json({message:"Error in getting messages"})
  }
})