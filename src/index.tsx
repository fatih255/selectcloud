import React, { Component } from "react";
import SelectCloudWorker, { CloudProps } from "./SelectCloudWorker";

export default class SelectCloud extends Component<Props, State> {
	static defaultProps = {
		selectable: true
	};
	componentDidMount() {
		const observer = new MutationObserver((mutationList, o) => {
			let haveitem = false;
			for (const mutation of mutationList) {
				if (haveitem) {
					o.disconnect();
					this.setState({ haveNode: true });
					return;
				}
				if (mutation.type === "childList") {
					// console.log("test");
					const childNode = mutationList[0].target as HTMLElement;
					if (childNode) {
						haveitem =
							childNode.getAttribute("class") ===
							this.props.options.containerClass;
					}
				}
			}
		});
		const targetNode = document.querySelector(
			`.${this.props.options.containerClass}`
		);
		if (targetNode) observer.observe(targetNode, { childList: true });
	}
	constructor(props: Props) {
		super(props);
		this.state = {
			haveNode: false
		};
	}

	render() {
		return (
			<div>
				{this.props.selectable && this.state.haveNode && (
					<SelectCloudWorker
						children={this.props.children}
						options={this.props.options}
					/>
				)}
				{(!this.props.selectable || !this.state.haveNode) &&
					this.props.children}
				{!this.state.haveNode &&
					this.props.loadingComponent &&
					this.props.loadingComponent}
			</div>
		);
	}
}

type Props = typeof SelectCloud.defaultProps & {
	options: CloudProps["options"];
	children?: React.ReactNode;
	selectable?: boolean;
	loadingComponent?: JSX.Element;
};

type State = {
	haveNode: boolean;
};
