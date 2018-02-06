import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './index.scss';

import ItemCarousal from './components/itemcarousal';
import ItemListContainer from './components/itemlist';
import VehicleSelector from './components/vehicleselector';
import Awards from './components/awards';

const option = {
	dots: false,
	autoplay: true,
	effect: 'fade',
	autoplaySpeed: 3000
};

const option1 = {
	...option,
	dots: true,
	autoplay: false,
	effect: 'scrollx',
	adaptiveHeight: true,
	centerMode: true
}

const CarousalItems = [
	{ imageUrl: "http://orbiz.in/wp-content/uploads/2018/01/slider1.jpg" },
	{ imageUrl: "http://orbiz.in/wp-content/uploads/2018/01/slider-new-1.jpg" },
	{ imageUrl: "http://orbiz.in/wp-content/uploads/2018/01/slider4.jpg" },
	{ imageUrl: "http://orbiz.in/wp-content/uploads/2018/01/slider-new-2.jpg" }
];

const NumberPlatesItems = [
	{
		_id: 0,
		name: 'Black Batman',
		hasOffer: true,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg"
	},
	{
		_id: 1,
		name: "Black German Speedx",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
	},
	{
		_id: 2,
		name: "Black German Speedx",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i1.wp.com/orbiz.in/wp-content/uploads/2017/12/IND-blue-flag.jpg"
	},
	{
		_id: 3,
		name: "Black German Speedx",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "//i2.wp.com/orbiz.in/wp-content/uploads/2017/11/BLANK-GERMAN.jpg?resize=300%2C300&ssl=1"
	},
	{
		_id: 4,
		name: "Black German",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg"
	},
	{
		_id: 5,
		name: "Black Spanish",
		hasOffer: true,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
	},
	{
		_id: 6,
		name: "Blue batman",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
	},
	{
		_id: 7,
		name: "Black Speedx",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg"
	},
	{
		_id: 8,
		name: "German",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
	},
	{
		_id: 9,
		name: "Black German",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/black-german-speedx-car-number-plate.jpg"
	},
	{
		_id: 10,
		name: "Black Speedx",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "//i0.wp.com/orbiz.in/wp-content/uploads/2017/11/blank-euro-1.jpg"
	},
	{
		_id: 11,
		name: "German Speedx",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "https://i2.wp.com/orbiz.in/wp-content/uploads/2017/11/euro-taxi.jpg"
	}
];

const frameItems = [
	{
		_id: 0,
		name: 'Orbiz Adjustable Frame Type A(ADFT101)',
		hasOffer: true,
		price: 799,
		offerPrice: 399,
		imageUrl: "https://i1.wp.com/orbiz.in/wp-content/uploads/2018/01/adft101.jpg"
	},
	{
		_id: 1,
		name: "Car Frame",
		hasOffer: false,
		price: 599,
		offerPrice: 399,
		imageUrl: "//i1.wp.com/orbiz.in/wp-content/uploads/2018/01/car-frame.jpg?resize=300%2C300&ssl=1"
	},
	{
		_id: 2,
		name: "Orbiz Adjustable Frame Type B(ADFT102)",
		hasOffer: false,
		price: 799,
		offerPrice: 399,
		imageUrl: "//i2.wp.com/orbiz.in/wp-content/uploads/2018/01/adft104.jpg?resize=300%2C300&ssl=1"
	},
	{
		_id: 3,
		name: "Black German Speedx",
		hasOffer: false,
		price: 1400,
		offerPrice: 700,
		imageUrl: "//i0.wp.com/orbiz.in/wp-content/uploads/2018/01/adft102.jpg?resize=300%2C300&ssl=1"
	}
];

const frameCarousalItems = [
	{
		subtitle: "Germans are always classy!",
		product_id: "7e9c85a",
		title: "Orbiz German Number Plates",
		description: "Germans are always known for their craftsmanship when it comes to automotives. So does our german number plates. Make your vehicle look world class with just one click.",
		imageUrl: "//orbiz.in/wp-content/uploads/2018/01/04-min.jpg"
	},
	{
		subtitle: "No, It’s Not just for cars!",
		product_id: "fb289f6",
		title: "Orbiz Spanish Number Plates",
		description: "These Orbiz Spanish number plates are specially made for those who believe in being unique. The uniqueness our spanish plates are providing is sublime. Go, Order your plates today!",
		imageUrl: "//orbiz.in/wp-content/uploads/2018/01/05-min.jpg"
	},
	{
		subtitle: "For The Super Hero In You!",
		product_id: "2ad07c0",
		title: "Orbiz Batman Number Plates",
		description: "We manufacture custom number plates as per the client’s inclination and taste. Also, you can always get the best number plates which will make your vehicle look incredibly attractive as well as unique.",
		imageUrl: "//orbiz.in/wp-content/uploads/2018/01/02.jpg"
	}
];

const vehicleData = [
	{
		_id: 0,
		type: "Car",
		models: [
			{
				_id: 0,
				name: "Maruti 800"
			},
			{
				_id: 1,
				name: "I20"
			}
		]
	},
	{
		_id: 1,
		type: "Bike",
		models: [
			{
				_id: 0,
				name: "Royal Enfield"
			},
			{
				_id: 1,
				name: "Pulsar 200 NS"
			},
			{
				_id: 2,
				name: "Triumph"
			}
		]
	},
	{
		_id: 2,
		type: "Super Car",
		models: [
			{
				_id: 0,
				name: "Lamborghini"
			},
			{
				_id: 1,
				name: "Porsche Cayenne"
			}
		]
	},
	{
		_id: 3,
		type: "Bus",
		models: [
			{
				_id: 0,
				name: "Tata"
			},
			{
				_id: 1,
				name: "Ashok Leyland"
			}
		]
	}
];

export default class Home extends Component {

	render() {
		return (
			<div className="HomeContainer page-container">
				<Row className="flex-column">
					<Col xs={{ span: 24 }} className="SectionContainer MainCarousalContainer">
						<ItemCarousal type="image" items={CarousalItems} options={option} />
					</Col>
					<Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer NumberPlatesContainer">
						<ItemListContainer title="Number Plates" items={NumberPlatesItems} current_filter_type={'all'} />
					</Col>
					<Col xs={{ span: 24 }} className="t-pad-20 b-pad-50 black-bg SectionContainer CarousalContainer">
						<Col xs={{ span: 24 }} className="b-mrgn-20 flex-row flex-center titleContainer">
							<div className="font-24 titleText">We Also Make Custom Number Plates For Your Premium Car</div>
						</Col>
						<ItemCarousal type="mixed" items={frameCarousalItems} options={option1} />
					</Col>
					<Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer FramesContainer">
						<ItemListContainer title="Frames" items={frameItems} current_filter_type={'all'} />
					</Col>
					<Col xs={{ span: 24 }} className="tb-pad-20 black-bg SectionContainer vehicleSelectorContainer">
						<Col xs={{ span: 24 }} className="b-mrgn-20 flex-row flex-center titleContainer">
							<div className="font-24 titleText">Want to see how number plate will look on your vehicle?</div>
						</Col>
						<Col xs={{ span: 22, offset: 1 }}>
							<VehicleSelector vehicles={vehicleData}/>
						</Col>
					</Col>
					<Col xs={{ span: 22, offset: 1 }} className="tb-pad-20 SectionContainer awardsSectionContainer">
						<Col xs={{ span: 24 }} className="b-mrgn-20 flex-column flex-center primary titleContainer">
							<div className="font-24 titleText">ORBIZ AUTOMOTIVEZ</div>
							<div className="underline">&nbsp;</div>
						</Col>
						<Col xs={{ span: 24 }} className="b-mrgn-20 flex-column flex-center">
							<Awards />
						</Col>
					</Col>
				</Row>
			</div>
		);
	}
}
