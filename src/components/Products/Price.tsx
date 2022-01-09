import React from "react";

export const Price: React.FC<{ price: number }> = ({ price }) => {
	const int = Math.floor(price);
	const cents = (price - int).toFixed(2).substring(2);
	return (
		<>
			R${int.toLocaleString()}
			<sup>{cents}</sup>
		</>
	);
};

export default Price;
