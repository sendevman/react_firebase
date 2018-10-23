import { firestore } from '../../firebase/firebase';

export function getData(data) {
	return firestore.collection(data).get()
		.then(res => {
			const response = [];
			res.forEach(item => {
				response.push(item.data());
			});
			return response;
		});
}
