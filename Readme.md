# Read the following carefully

1. ### express

   to handle request and response

2. ### mongoose

   used to connect to mongodb database

3. ### nodemon

   used to restart server just after making changes

4. ### dotenv

   used to config the private variables

5. ### cors

   is a middleware used to configure the incoming request

6. ### cookie-parser

   allow server to perform curd operation on client cookies

7. ### mongoose-aggregate-paginate-v2

   used to write aggregation queries

8. ### bcrypt

   used to hash passwords

9. ### jsonwebtoken

   used to create JSON web tokens (JWTs)

10.   ### multer

      used for uploading file

11.   ### cloudinary
      is a service used to store the media on its server

---

-  '.env' have a problem with 'type:module' so the solution for it is to add '-r dotenv/config' in 'dev' command in scripts in the package.json file

-  we also used gitignore generators to generate '.gitignore' file

-  used .env package to config the environment variables

-  async function by default returns a promise

-  app.on('eventName',callbackfn) is used to handle custom events and events are emitted by app.emit('eventName')

-  app.use() is used to add middlewares and configure settings

-  higher order function is the one which either

   1. takes function as an argument
   2. returns another function

-  Error is a predefined class in node

-  we have generated access token from SHA256

-  uploading the media files first to the local diskstorage and then uploading it to the cloudinary and deleting(unlink) the files which were not uploaded from local to cloudinary

-  multer.diskStorage({}) have two options only (destination,filename)

-  if we write a URL on chrome browser, only GET request will give us response and to get response of the POST request we have to use thunder client or postman

-  cookies are accessed two ways (req and res both have access)

-  if 'undefined' value is added to the cookies then they are stored like string "undefined"

-  we are setting cookie maxAge(takes value in milliseconds) that is the expiry of the cookie
   we can also use expires(takes Date value) attribute to set the expiry
   but do not confuse with the jwt token expiry

   -  JWT and Cookies both have their own exipry and we have set both

-  all dotenv variables become type String

-  in mongodb, document refers to the entry or a data

-  validateBeforeSave:"false" will skip the validation checks defined in the Mongoose schema, This refers to the validation of document fields as per schema rules (like required fields, minimum length, etc.). Setting validateBeforeSave: false skips these checks.

-  'Content-Disposition', 'attachment; filename="example.pdf"' is used to download files from the server (use res.send(file.data)) here file.data is the buffer data of the file

-  when we save the model to the database it converts the name of the model to the lowercase and makes it plural. Eg. "Subscriber" changes to "subscribers"

-  whenever we want to take data from the url we use params

-  we take data(username, avatar, etc...) from the params specially while fetching details of the channel because usually we have the channel link available to route to the user channel

---

```javascript
// for uploading file directly from the memory storage
// Configure Multer storage
const storage = multer.memoryStorage(); // Store files in memory as a Buffer

export const upload = multer({ storage: storage });

const fileSchema = new Schema({
   filename: { type: String, required: true },
   contentType: { type: String, required: true },
   data: { type: Buffer, required: true }, // Store file data as a binary Buffer
   uploadDate: { type: Date, default: Date.now },
});

export const File = mongoose.model("File", fileSchema);
//--------------------------------------------------------------------
router.post("/upload", upload.single("file"), async (req, res) => {
   try {
      // Create a new file document
      // const file = new File({
      //    filename: req.file.originalname, // File name
      //    contentType: req.file.mimetype, // MIME type of the file
      //    data: req.file.buffer, // The file data (Buffer)
      // });
      console.log(req.file);

      const file = await File.create({
         filename: req.file.originalname, // File name
         contentType: req.file.mimetype, // MIME type of the file
         data: req.file.buffer, // The file data (Buffer)
      });

      // Save the file to the database
      const response = await file.save();
      // console.log("response", response);

      res.status(200).json({
         message: "File uploaded successfully",
         fileId: file._id,
      });
   } catch (error) {
      res.status(500).json({ message: "File upload failed", error });
   }
});
//-------------------------------------------------------------------------
router.get("/download/:id", async (req, res) => {
   try {
      const file = await File.findById(req.params.id);

      if (!file) {
         return res.status(404).json({ message: "File not found" });
      }

      // Set the content type and disposition
      res.set({
         "Content-Type": file.contentType,
         "Content-Disposition": `attachment; filename="${file.filename}"`,
      });

      // console.log(file.data);

      // Send the file data as a response
      res.send(file.data);
   } catch (error) {
      res.status(500).json({ message: "File download failed", error });
   }
});
```
