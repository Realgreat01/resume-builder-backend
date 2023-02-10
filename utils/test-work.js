const fs = require('fs');
const {Blob} = require('buffer');
const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const UserSchema = require('../models/UserSchema');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: false,
});

// const storage = multer.diskStorage({
// 	destination: (req, file, callback) => callback(null, 'uploads'),
// 	filename: (req, file, callback) => callback(null, 2022 + file.originalname),
// });

const storage = multer.memoryStorage();

const upload = multer({storage});

const options = {
	use_filename: true,
	unique_filename: false,
	overwrite: true,
};

const createDirectory = async (req, res, next) => {
	fs.mkdir('uploads', {recursive: true}, err => {
		if (err) return next(err);
		return next();
	});
};

router.post('/id', createDirectory, upload.single('profile_picture'), async (req, res, next) => {
	try {
		if (req.file) {
			const {id} = req.user;
			const currentUser = await UserSchema.findById(id);
			const cloudinaryFile = await cloudinary.uploader.upload(req.file.path, options);
			currentUser.profile_picture = cloudinaryFile.url;
			currentUser.save();
			setTimeout(() => {
				fs.rm('uploads', {recursive: true}, err => {});
			}, 5000);
			return res
				.status(201)
				.json({message: 'uploaded successfully', image_source: cloudinaryFile.url});
		}
	} catch (error) {
		createDirectory();
		fs.mkdir('uploads', {recursive: true}, err => {});
		return res.status(500).json({error: 'unable to upload file', message: error});
	}
});
let file;
function blobToFile(theBlob, fileName) {
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}
router.post('/', upload.single('profile_picture'), async (req, res, next) => {
	//converting buffer to usable format
	const image_buffer = Buffer.from(req.file.buffer);
	file = Buffer.from(req.file.buffer);
	const blob = new Blob([image_buffer]);
	const imageFile = URL.createObjectURL(blob);
	console.log(imageFile);

	try {
		let cld_upload_stream = cloudinary.uploader.upload_stream(
			{
				folder: 'foo',
			},
			function (error, result) {
				console.log(error, result);
			}
		);
		const result = streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/', (req, res) => console.log(file));

module.exports = router;
