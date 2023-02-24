import SplitPane from "react-split-pane";
import './index.css'
function ResizableLayout({left,right}){
    return (
        <SplitPane

            split="vertical"
            defaultSize={200}
            minSize={100}
            maxSize={400}
        >
            {left}
            {right}
        </SplitPane>
    )
}

export default ResizableLayout