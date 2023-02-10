const fs = require('fs');
const {Blob} = require('buffer');
const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const UserSchema = require('../models/UserSchema');
const streamifier = require('streamifier');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: false,
});

const storage = multer.memoryStorage();
const upload = multer({storage});

const options = {
	overwrite: false,
	unique_filename: true,
	folder: 'user-profile-image',
};

router.post('/', upload.single('profile_picture'), async (req, res, next) => {
	//converting buffer to usable format
	const {id} = req.user;
	const currentUser = await UserSchema.findById(id);
	try {
		let cloudinaryUploadStream = cloudinary.uploader.upload_stream(
			options,
			async (error, data) => {
				if (error) throw new Error('unable to update user profile picture');
				else {
					if (currentUser) {
						currentUser.profile_picture = data.url;
						await currentUser.save();
						return res.status(201).json({
							message: 'Profile picture updated successfully !',
							data: {profile_picture: data.url},
						});
					}
				}
			}
		);
		streamifier.createReadStream(req.file.buffer).pipe(cloudinaryUploadStream);
	} catch (error) {
		console.log(error);
		return res.status(500).json({error: 'unable to upload file'});
	}
});

router.get('/', (req, res) => console.log(file));

module.exports = router;
