import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid } from '@material-ui/core';
import { ProductCard } from '../../components';

const InfiniteList = ({ data }) => {
	const [ dataLimit, setDataLimit ] = useState(12);

	const dataList = data.slice(0, dataLimit);

	const fetchMoreData = () => {
		setTimeout(() => {
			setDataLimit(dataLimit + 8);
		}, 300);
	};

	return (
		<div>
			<InfiniteScroll
				dataLength={data.length}
				hasMore
				next={fetchMoreData}
				style={{ overflow: 'hidden', padding: '2px' }}
			>
				<Grid container spacing={1}>
					{dataList.map((product) => (
						<Grid item key={product.id} sm={3} xs={6}>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
			</InfiniteScroll>
		</div>
	);
};

export default InfiniteList;
