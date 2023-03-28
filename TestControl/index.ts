import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class TestControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // private _container: HTMLDivElement;
    // private _context: ComponentFramework.Context<IInputs>;
    // private notifyOutputChanged: () => void;
    // // Flag to track if the component is in edit mode or not\
    // private isEditMode: boolean;
    // // Tracking variable for the name property\
    // private name: string | null;

    private value1: HTMLInputElement;
    private value2: HTMLInputElement;
    private answerArea: HTMLLabelElement;
    private buttonSum: HTMLButtonElement;
    private buttonDivide: HTMLButtonElement;
    private buttonMultiply: HTMLButtonElement;
    private _result: string;
    private _notifyOutputChanged: () => void;
    private _errorMessage: HTMLLabelElement;

    /**
     * Empty constructor.
     */
    constructor() {

    }

    public funcMath(type: string){
        switch (type) {
            case "Sum":
                var sum = parseFloat(this.value1.value) + parseFloat(this.value2.value);
                this._result = sum.toString();
                this._notifyOutputChanged();
                break;
            case "Divide":
                if (parseInt(this.value2.value)==0) {
                    this._result = "Can't Divide by zero";
                    this.value1.value = "";
                    this.value2.value = "";
                    this._notifyOutputChanged();
                    //alert("Can't divide by zero");   
                }
                else{
                    var divide = parseFloat(this.value1.value) / parseFloat(this.value2.value);
                    this._result = divide.toString();
                    this._notifyOutputChanged();
                }
                break;
            case "Multiply":
                var mul = parseFloat(this.value1.value) * parseFloat(this.value2.value);
                this._result = mul.toString();
                this._notifyOutputChanged();
                break;    
            default:
                break;
        }

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        // Add control initialization code
        this._notifyOutputChanged = notifyOutputChanged;

        //value 1 text input
        this.value1 = document.createElement("input");
        this.value1.setAttribute("type", "text");
        this.value1.setAttribute("id", "textInput1");
        this.value1.setAttribute("class", "textInput");
        this.value1.setAttribute("placeholder", "Value 1");

        container.appendChild(this.value1);

        //value 2 text input
        this.value2 = document.createElement("input");
        this.value2.setAttribute("type", "text");
        this.value2.setAttribute("id", "textInput2");
        this.value2.setAttribute("class", "textInput");
        this.value2.setAttribute("placeholder", "Value 2");

        container.appendChild(this.value2);

        //button Sum
        this.buttonSum = document.createElement("button");
        this.buttonSum.innerHTML = "Sum";
        this.buttonSum.setAttribute("name", "Sum");
        this.buttonSum.setAttribute("type", "submit");
        this.buttonSum.setAttribute("id", "btnSum");
        this.buttonSum.setAttribute("class", "btn");

        container.appendChild(this.buttonSum);

        //adding event listener to sum button
        this.buttonSum.addEventListener("click", () => { this.funcMath("Sum"); });

        //button Divide
        this.buttonDivide = document.createElement("button");
        this.buttonDivide.innerHTML = "Divide";
        this.buttonDivide.setAttribute("name", "Divide");
        this.buttonDivide.setAttribute("type", "submit");
        this.buttonDivide.setAttribute("id", "btnDivide");
        this.buttonDivide.setAttribute("class", "btn");

        container.appendChild(this.buttonDivide);

        //adding event listener to sum button
        this.buttonDivide.addEventListener("click", () => { this.funcMath("Divide"); });

        //button Multiply
        this.buttonMultiply = document.createElement("button");
        this.buttonMultiply.innerHTML = "Multiply";
        this.buttonMultiply.setAttribute("name", "Multiply");
        this.buttonMultiply.setAttribute("type", "submit");
        this.buttonMultiply.setAttribute("id", "btnMultiply");
        this.buttonMultiply.setAttribute("class", "btn");

        container.appendChild(this.buttonMultiply);

        //adding event listener to sum button
        this.buttonMultiply.addEventListener("click", () => { this.funcMath("Multiply"); });

    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
        // Checks for updates coming in from outside
        
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {
            calResult: this._result
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
        // Remove the event listener we created in init
        //this._container.querySelector("button")!.removeEventListener("click", this.buttonClick);
    }
}
