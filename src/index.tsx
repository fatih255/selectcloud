import React, { Component } from "react";
import SelectCloudWorker, { CloudProps } from "./SelectCloudWorker";

export default class SelectCloud extends Component<Props, State> {
	static defaultProps = {
		selectable: true
	};
	componentDidMount() {
		const observer = new MutationObserver((mutationList, o) => {
			const haveitem = mutationList
				.filter((m) => m.type === "childList")
				.reduce((prev: any, next: any) => [...prev, next.addedNodes], [])
				.some((m) =>
					m[0].getAttribute("class").includes(this.props.options.itemsClass)
				);
			if (haveitem) {
				o.disconnect();
				this.setState({ haveNode: true });
				return;
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
			<>
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
			</>
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
