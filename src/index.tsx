import React, { Component } from "react";
import SelectCloudWorker, { CloudProps } from "./SelectCloudWorker";

export default class SelectCloud extends Component<Props, State> {
	static defaultProps = {
		selectable: true
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			// vv: vv
		};
	}
	render() {
		return (
			<div>
				{this.props.selectable ? (
					<SelectCloudWorker
						children={this.props.children}
						options={this.props.options}
					/>
				) : (
					this.props.children
				)}
			</div>
		);
	}
}

type Props = typeof SelectCloud.defaultProps & {
	options: CloudProps["options"];
	children?: React.ReactNode;
	selectable?: boolean;
};

type State = {
	// state
};
