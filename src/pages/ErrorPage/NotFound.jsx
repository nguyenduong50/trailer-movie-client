import React, { useEffect } from 'react';
import Nav from '../../components/browse/Nav';
import classes from './NotFound.module.css';
import axios from 'axios';

function NotFound() {
	return (
		<>
			<Nav />
			<div className={classes["title-page-error"]}>
				<h2 style={{fontSize: '100px'}}>404</h2>
				<h2 style={{fontSize: '40px'}}>Page not found!</h2>
			</div>
		</>
	);
}

export default NotFound;

