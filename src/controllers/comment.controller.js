import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllComments = asyncHandler(async (req, res) => {
   // all comment on single video

   const { page, limit } = req.query;
   const { videoId } = req.params;

   if (
      [page, limit, videoId].some(
         (field) => field === undefined || field === null
      )
   ) {
      throw new ApiError(400, "All fields are required");
   }

   const pipeline = Comment.aggregate([
      { $match: { video: new mongoose.Types.ObjectId(videoId) } },
      {
         $project: { content: 1, _id: 0 },
      },
   ]);

   const comments = await Comment.aggregatePaginate(pipeline, { page, limit });

   res.status(200).json(
      new ApiResponse(200, comments.docs, "All comments fetched successfully")
   );
});

const addComment = asyncHandler(async (req, res) => {
   const { content } = req.body;
   const videoId = req.videoId; // inserted via middleware
   const owner = req.user._id;

   if (
      [content, videoId, owner].some(
         (field) => field === undefined || field === null
      )
   ) {
      throw new ApiError(400, "All fields are required");
   }
   const comment = await Comment.create({
      content,
      owner,
      video: videoId,
   });

   if (!comment) {
      throw new ApiError(400, "Comment not found");
   }

   res.status(200).json(
      new ApiResponse(200, { Commented: true }, "Commented successfully")
   );
});

const updateComment = asyncHandler(async (req, res) => {
   const { oldContent, content } = req.body;
   const owner = req.user._id,
      videoId = req.videoId;

   if (
      [content, oldContent, videoId, owner].some(
         (field) => field === undefined || field === null
      )
   ) {
      throw new ApiError(400, "All fields are required");
   }

   const comment = await Comment.findOneAndUpdate(
      {
         content: oldContent,
         owner,
         video: videoId,
      },
      {
         content,
      },
      { new: true }
   );

   if (!comment) {
      throw new ApiError(400, "Comment not found");
   }

   res.status(200).json(new ApiResponse(200, comment, "Comment updated"));
});

const deleteComment = asyncHandler(async (req, res) => {
   const { content } = req.body;
   const videoId = req.videoId,
      owner = req.user._id;
   if (
      [content, videoId, owner].some((field) =>
         ["", undefined, null].includes(field)
      )
   ) {
      throw new ApiError(400, "All fields are required");
   }

   const result = await Comment.findOneAndDelete({
      content,
      video: videoId,
      owner,
   });

   if (!result) {
      throw new ApiError(400, "Comment not found");
   }

   res.status(200).json(
      new ApiResponse(200, { Deleted: true }, "Comment deleted successfully")
   );
});

export { addComment, updateComment, deleteComment, getAllComments };
