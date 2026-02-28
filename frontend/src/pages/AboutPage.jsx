import { useEffect } from 'react';
import { About } from '../features/about';

const AboutPage = () => {
	useEffect(() => {
		document.title = 'About | NUStay';
	}, []);

	return <About />;
};

export default AboutPage;
