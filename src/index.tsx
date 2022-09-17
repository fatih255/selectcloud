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
				.map((rnode) => {
					const isItemClassElements: any[] = [];

					const nodes = rnode[0].querySelectorAll(`*`);
					nodes.forEach((node: { getAttribute: (arg0: string) => string | string[]; }) => {
						isItemClassElements.push(
							node
								.getAttribute("class")
								?.includes(this.props.options.itemsClass)
						);
					});
					return isItemClassElements.some((x) => x);
				})
				.some((x) => x);
			if (haveitem) {
				o.disconnect();
				this.setState({ haveNode: true });
				return;
			}
		});
		const targetNode = document.querySelector(
			`.${this.props.options.containerClass}`
		);
		if (targetNode)
			observer.observe(targetNode, { childList: true, subtree: true });
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
