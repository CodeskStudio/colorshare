import React from "react";
import { SiConvertio } from 'react-icons/si';
import { Button } from 'reactstrap';

class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { children } = this.props;
		const { opened } = this.state;

		return (
			<div className="box">
				<Button onClick={this.toggleBox} class="shadow-lg sh-txt"><SiConvertio/></Button>
				{opened && (					
					<div class="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;