import React, { useState } from 'react';
import UpBelowIcon from '@mui/icons-material/UnfoldMore';
import './companydetails.css';
import serialize from 'form-serialize';

const CollapseToggle = () => {
    const [collapsedd, setCollapsed] = useState(false);
    const toggleCollapse = () => {
        setCollapsed(!collapsedd);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target); // Create FormData object

        // Process file inputs and append them to the FormData object
        const fileInputs = e.target.querySelectorAll('input[type="file"]');
        fileInputs.forEach((input) => {
            const { name, files } = input;
            formData.append(name, files[0]);
        });

        // Convert FormData to JSON object (You can't directly convert FormData to JSON)
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });

        // Now jsonObject contains both file data and other form data
        console.log(jsonObject);
    };


    return (
        <><div className="collapsee">
            <p>Company Details
                <button className='arrow' onClick={toggleCollapse}><UpBelowIcon /></button>
            </p>
            <form id='company-details' onSubmit={handleSubmit}>
            <div className={`contentt ${collapsedd ? 'collapsedd' : ''}`}>
                <div className='cprofile' style={{flexWrap:'wrap'}}>
                    <div>
                        <div>
                            <label for="fname"><b>Company name</b></label><br></br>
                            <input type="text" id="companyName" name='companyName' required placeholder='Company name' className='companyin' />
                        </div>
                        <br></br>
                        <div><b><h3>Billing information</h3></b></div>

                        <div>
                            <label for="email"><b>Billing email</b></label><br></br>
                            <input className='check' type="checkbox" />Same as account email<br></br>
                            <input type="email" id="email" name='email' required placeholder='John@organization.com' className='companyin' />
                        </div>

                        <div>
                            <label for="ccemail"><b>Emails to CC</b></label><br></br>
                            <input type="email" id="ccemail" name='ccemail' required placeholder='emails' className='companyin' />
                        </div>

                        <div>
                            <label for="TRN"><b>Tax registration number(TRN)</b></label><br></br>
                            <input type="text" id="trn" name='trn' required placeholder='eg. GHG67676' className='companyin' />
                        </div><br></br>

                    </div><br></br>
                    <div className='upload1'> <b>Company documents</b><span className='ver'>. verification pending</span><br></br>
                        <span className='ver1'>please upload all these documents in order to verify your company</span>
                        <div>
                            <br></br>
                            <label for="formFile" class="form-label">Trade License*</label><br></br>
                            <input class='files' type="file" id="trade-licence" name='trade-licence'required />
                        </div><br></br>

                        <div>
                            <label for="formFileMultiple" class="form-label">Value added tax(VAT)*</label><br></br>
                            <input class='files' type="file" id="vat" name='vat' multiple required />
                        </div><br></br>

                        <div>
                            <label for="formFileDisabled" class="form-label">Incorporation Certificate*</label><br></br>
                            <input class='files' type="file" id="inc-certificate" name='inc-certificate' required />
                        </div><br></br>

                        <div>
                            <label for="formFileSm" class="form-label">Authorized signatory Emirates ID*</label><br></br>
                            <input class='files' id="emirates-id" name='emirates-id' type="file" required />
                        </div><br></br>

                        <div>
                            <label for="formFileLg" class="form-label">Extra documents?</label><br></br>
                            <input class='files' id="extra-documents" name='extra-documents' type="file" />
                        </div>

                    </div>

                </div>
                <div>
                <button className='bsave' type='submit'>Save</button>
            </div>
         </div>
         </form>
        </div></>
    );
};

export default CollapseToggle;
