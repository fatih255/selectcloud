import * as React from 'react';
import SelectCloud from '.';
import { clean } from './SelectCloudWorker';

type Props = {};

type State = {
	selectable: boolean;
};

export default class ReactTest extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			selectable: true,
		};
		this.handleChangeSelectable = this.handleChangeSelectable.bind(this);
	}
	handleChangeSelectable(value: boolean) {
		this.setState({ selectable: value });
	}
	render() {
		return (
			<div>
				<SelectCloud
					selectable={this.state.selectable}
					options={{
						itemsClass: 'note',
						containerClass: 'cloud-selection-box',
						crossEffect: ({ style, classList }) => {
							style.color = 'yellow';
							classList.add('test');
						},
						onComplete: (elements) => {
							// console.log(elements);
						},
					}}
				>
					<div
						style={{
							height: 200,
							background: 'yellow',
						}}
					></div>
					<div style={{ marginLeft: 50, marginRight: 50 }} className="cloud-selection-box">
						<h1 style={{ width: 100, backgroundColor: 'red' }} className="note">
							item1
						</h1>
						<h1 style={{ width: 100, backgroundColor: 'red' }} className="note">
							item2
						</h1>
						<h1 style={{ width: 100, backgroundColor: 'red' }} className="note">
							item3
						</h1>
						<h1 style={{ width: 100, backgroundColor: 'red' }} className="note">
							item4
						</h1>
						<h1 style={{ width: 100, backgroundColor: 'red' }} className="note">
							item5
						</h1>
						<h1 style={{ width: 100, backgroundColor: 'red' }} className="note">
							item6
						</h1>
						<h1 style={{ width: 100, backgroundColor: 'red' }} className="note">
							item7
						</h1>
					</div>
				</SelectCloud>
				<button onClick={() => this.setState({ selectable: true })}>selectable</button>
				<button onClick={() => this.setState({ selectable: false })}>selectablenone</button>
				<button onClick={() => clean()}>remove selection</button>
				<button
					onClick={() => {
						const selectionbox = document.querySelector('.cloud-selection-box');
						const newitem = document.createElement('h1') as HTMLElement;
						newitem.innerText = 'new';
						newitem.classList.add('note');
						newitem.style.width = 100 + 'px';
						newitem.style.backgroundColor = 'red';
						if (selectionbox) selectionbox.append(newitem);
					}}
				>
					add Item
				</button>
			</div>
		);
	}
}

// render(<ReactTest />, document.getElementById("root"));
