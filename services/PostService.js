import Post from "../model/Post.js";

import FileService from "./FileService.js";

class PostService {

    // Метод создания поста
    async create(post, image) {
        const fileName = FileService.save(image);
        const createdPost = await Post.create({ ...post, image: fileName });
        return createdPost;
    }

    // Метод получения всех постов
    async getAll() {
        const posts = await Post.find();
        return posts;
    }

    // Метод получения конкретного поста
    async get(id) {

        // Проверяем на наличие ID
        if (!id) throw new Error("Обязательный параметр ID не был указан!");

        const post = await Post.findById(id);
        return post;
    }

    // Метод удаления поста
    async delete(id) {

        // Проверяем на наличие ID
        if (!id) throw new Error("Обязательный параметр ID не был указан!");

        const post = await Post.findByIdAndDelete(id);
        return post;
    }

    // Метод редактирования поста
    async update(post) {

        // Проверяем на наличие ID
        if (!post._id) throw new Error("Запись с таким ID не существует!");

        const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true });
        return updatedPost;
    }
}

export default new PostService();