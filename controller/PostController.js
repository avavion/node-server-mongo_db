import PostService from "../services/PostService.js";

class PostController {

	// Метод создания поста
	async create(req, res) {
		try {

			console.log(req.files);

			// Создаем запись
			const post = await PostService.create(req.body, req.files.image);
			// Вернули запись в формате JSON
			res.status(200).json(post);
		} catch (error) {
			// Вернули статус 500 (сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос) и само тело ошибки в формате JSON
			res.status(500).json(error);
		}
	}

	// Метод получения всех постов
	async getAll(req, res) {
		try {
			const posts = await PostService.getAll();
			return res.status(200).json(posts);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	// Метод получения конкретного поста
	async get(req, res) {
		try {
			const post = await PostService.get(req.params.id);
			return res.status(200).json(post);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	// Метод удаления поста
	async delete(req, res) {
		try {
			const post = await PostService.delete(req.params.id);
			return res.status(200).json(post);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	// Метод редактирования поста
	async update(req, res) {
		try {
			const updatedPost = await PostService.update(req.body);
			return res.status(200).json(updatedPost);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

export default new PostController();