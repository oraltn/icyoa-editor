import React from "react"
import FileSaver from "file-saver"

function getImgSrc(str) {
    if (str == "") return null;

    const match = str.match(/^<img.*src="([^"]*)"/);
    if (match && match[1]) return match[1];
    return null;
}

class ImageInput extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleChange(e) {
        const file = e.target.files[0];

        if (this.reader) {
            this.reader.abort();
        } else {
            this.reader = new FileReader();
            this.reader.onload = () => this.props.onChange(this.reader.result);
        }

        this.reader.readAsDataURL(file);
    }

    componentWillUnmount() {
        if (this.reader) this.reader.abort();
    }

    handleDragOver(e) {
        if(e.dataTransfer.types.includes("text/html")) {
            e.preventDefault();
        }
    }

    handleDrop(e) {
        // console.log(e.dataTransfer)
        // console.log(e.dataTransfer.types);
        // console.log(e.dataTransfer.files);
        // console.log(e.dataTransfer.getData("text/plain"));
        // console.log(e.dataTransfer.getData("text/html"));
        // console.log(e.dataTransfer.getData("text/uri-list"));
        // console.log(e.dataTransfer.items[0]);
        // e.preventDefault();
        const src = getImgSrc(e.dataTransfer.getData("text/html"));
        if (src) {
            e.preventDefault();
            this.props.onChange(src);
        }
    }

    render() {
        return <input type="file" className="form-control-file"
            onChange={this.handleChange}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
        />;
    }
}

class CroppableImage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {offsetX: 0, offsetY: 0, logScale: 0};

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    enforceScaleBoundary(logScale) {
        const vw = this.containerEl.offsetWidth;
        const vh = this.containerEl.offsetHeight;

        if(this.imageEl.width * Math.pow(2, logScale) < vw) {
            logScale = Math.ceil(8*Math.log2(vw/this.imageEl.width))/8;
        }
        if(this.imageEl.height * Math.pow(2, logScale) < vh) {
            logScale = Math.ceil(8*Math.log2(vh/this.imageEl.height))/8;
        }
        if(logScale > 0) logScale = 0;

        return logScale;
    }

    enforceBoundaries({offsetX, offsetY, logScale}) {
        logScale = this.enforceScaleBoundary(logScale);

        const vw = this.containerEl.offsetWidth;
        const vh = this.containerEl.offsetHeight;

        const scale = Math.pow(2, logScale);
        const imageWidth = this.imageEl.width;
        const imageHeight = this.imageEl.height;

        if (imageWidth < vw/scale) offsetX = 0;
        else if (imageWidth/2 - Math.abs(offsetX) < vw/2/scale) {
            offsetX = Math.sign(offsetX) * (imageWidth - vw/scale)/2;
        }
        if (imageHeight < vh/scale) offsetY = 0;
        if (imageHeight/2 - Math.abs(offsetY) < vh/2/scale) {
            offsetY = Math.sign(offsetY) * (imageHeight - vh/scale)/2;
        }

        return {offsetX, offsetY, logScale};
    }

    drag(state, deltaX, deltaY) {
        const scale = Math.pow(2, state.logScale);
        return this.enforceBoundaries({
            offsetX: state.offsetX-deltaX/scale,
            offsetY: state.offsetY-deltaY/scale,
            logScale: state.logScale
        });
    }

    zoom(state, deltaScale) {
        let logScale = state.logScale + deltaScale;

        logScale = this.enforceScaleBoundary(logScale);

        deltaScale = logScale - state.logScale;

        return this.enforceBoundaries({
            offsetX: state.offsetX,
            offsetY: state.offsetY,
            logScale
        });
    }

    bake() {
        const vw = this.containerEl.offsetWidth;
        const vh = this.containerEl.offsetHeight;
        const canvas = document.createElement('canvas');
        canvas.width = vw;
        canvas.height = vh;
        const ctx = canvas.getContext('2d');
        const imageWidth = this.imageEl.width;
        const imageHeight = this.imageEl.height;
        const scale = Math.pow(2, this.state.logScale);
        ctx.drawImage(this.imageEl,
            vw/2-(imageWidth/2+this.state.offsetX)*scale,
            vh/2-(imageHeight/2+this.state.offsetY)*scale,
            imageWidth*scale,
            imageHeight*scale
        );

        if (this.props.onChange) {
            this.props.onChange(canvas.toDataURL());
        }
        else {
            canvas.toBlob(blob => FileSaver.saveAs(blob, "crop.png"));
        }
    }

    isDraggable() {
        const vw = this.containerEl.offsetWidth;
        const vh = this.containerEl.offsetHeight;

        const imageWidth = this.imageEl.width;
        const imageHeight = this.imageEl.height;

        return imageWidth > vw || imageHeight > vh;
    }

    isZoomable() {
        return this.isDraggable();
    }

    handleMouseDown(e) {
        if (e.button == 0 && this.isDraggable()) {
            e.preventDefault();
            this.originalX = e.pageX;
            this.originalY = e.pageY;
            this.lastDeltaX = 0;
            this.lastDeltaY = 0;

            window.addEventListener('mousemove', this.handleMouseMove);
            window.addEventListener('mouseup', this.handleMouseUp);
            window.addEventListener('wheel', this.handleWheel);
        } else if (e.button == 1) {
            e.preventDefault();
            this.bake();
        }
    }

    handleMouseMove(e) {
        const fullDeltaX = e.pageX - this.originalX;
        const fullDeltaY = e.pageY - this.originalY;
        const deltaX = fullDeltaX - this.lastDeltaX;
        const deltaY = fullDeltaY - this.lastDeltaY;
        this.lastDeltaX = fullDeltaX;
        this.lastDeltaY = fullDeltaY;
        this.setState(state => this.drag(state, deltaX, deltaY));
    }

    handleMouseUp(e) {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('wheel', this.handleWheel);
    }

    handleWheel(e) {
        if (this.isZoomable()) {
            e.preventDefault();
            let deltaScale = e.deltaY/-800.0;
            this.setState(state => this.zoom(state, deltaScale));
        }
    }

    handleLoad(e) {
        this.setState(state => this.enforceBoundaries(state));
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('wheel', this.handleWheel);
    }

    render() {
        return <div className={this.props.className}
            ref={el => this.containerEl = el}
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
            style={{
                overflow: "hidden",
                height:'200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <img src={this.props.src}
                ref={el => this.imageEl = el}
                className="croppable-image"
                onLoad={this.handleLoad}
                style={{
                    transform: `\
                        scale(${Math.pow(2,this.state.logScale)})\
                        translateX(${-this.state.offsetX}px)\
                        translateY(${-this.state.offsetY}px)\
                    `
                }}
            />
        </div>;
    }
}

class CardImgEditable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDragOver(e) {
        if(e.dataTransfer.types.includes("text/html")
            || e.dataTransfer.types.includes("Files")) {
            e.preventDefault();
        }
    }

    handleDrop(e) {
        const src = getImgSrc(e.dataTransfer.getData("text/html"));
        if (src) {
            e.preventDefault();
            this.props.onChange(src);
        }
        else if(e.dataTransfer.files.length > 0) {
            e.preventDefault();
            const file = e.dataTransfer.files[0];

            const reader = new FileReader();

            reader.onload = () => this.props.onChange(reader.result);
            reader.readAsDataURL(file);
        }
    }

    render() {
        return <div>
            <div className="img-container"
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <CroppableImage className="card-img-top" src={this.props.img}
                    onChange={this.props.onChange}
                    aspectRatio={3/2}
                />
            </div>
            <ImageInput onChange={this.props.onChange} />
        </div>;
    }
}

export default CardImgEditable;
