import Post from '../model/post.js';

export const createPost = async(request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        return response.status(200).json('Post saved successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
};

export const getAllPosts = async (request, response) => {
    let company = request.query.company;
    let posts;
    try {
        if(company) {
            posts = await Post.find({ company: company });
        } else {
            posts = await Post.find({});
        }

        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({msg: error.message})
    }
};

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        return response.status(200).json(post);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
};

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if(!post) {
            return response.status(404).json({ msg: 'post not found'});
        }

        await Post.findByIdAndUpdate(request.params.id, { $set: request.body })

        return response.status(200).json({ msg: 'post updated successfully'})
    } catch(error) {
        return response.status(500).json({error: error.message})
    }
};

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if(!post) {
            return response.status(404).json({ msg: 'post not found'});
        }
        await post.deleteOne();
        return response.status(200).json({ msg: 'post deleted successfully'})
    } catch (error) {
        return response.status(500).json({error: error.message})
    }
};