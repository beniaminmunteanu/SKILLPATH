import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import { VoteType } from './voteType';
import { isNumber } from 'node:util';

interface Post {
    name: String;
    description: String;
    content: String;
    mainTopic: String;
    author: String;
    upVotes: Number;
    downVotes: Number;
    postTopics: Array<String>;
    creationTimestamp: Date;
    lastVoted: Date;
    commentList: Array<String>;
    votersList: [
        {
            userName: String;
            voteType: VoteType;
        },
    ];
    links: { source: String; target: String; importance: Number }[];
}

interface PostModel extends Post, mongoose.Document {}

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    links: [
        {
            source: String,
            target: String,
            importance: Number,
        },
    ],
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    mainTopic: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        unique: true,
    },
    upVotes: {
        type: Number,
    },
    downVotes: {
        type: Number,
    },
    postTopics: [
        {
            type: String,
            required: true,
        },
    ],
    creationTimestamp: {
        type: Date,
    },
    lastVoted: {
        type: Date,
    },
    commentList: [{ type: String }],
    votersList: [
        {
            userName: String,
            voteType: String,
        },
    ],
});

postSchema.plugin(mongoosastic, {
    host: 'localhost',
    port: 9200,
});

export const PostModel = mongoose.model<PostModel>('Post', postSchema);
