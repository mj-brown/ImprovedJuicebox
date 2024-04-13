import { useState } from 'react';
import { useCreatePostMutation } from '../../features/api/apiSlice';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const [addPost, {isLoading, isError }] = useCreatePostMutation();

    const handleSubmit = async () => {
        try {
            const userData = { title, content, tags };
            await addPost({ userData }).unwrap();
            console.log("Successfully added post", userData);    
        } catch (error) {
            console.error("Failed to add post", error);
        }
    };

    return (
        <div>
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </label>
                <label>
                    Tags (comma separated):
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </label>
                <button type="submit">Add Post</button>
            </form>
        </div>
    )
};

export default AddPost;