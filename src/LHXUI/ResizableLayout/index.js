import SplitPane from "react-split-pane";
import './index.css'

function ResizableLayout({left, right}) {
    return (<SplitPane
        defaultSize={200}
        maxSize={400}
        minSize={100}
        split="vertical"
    >
        {left}
        {right}
    </SplitPane>)
}

export default ResizableLayout