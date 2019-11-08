
// react
import * as React from 'react';

// shared component
import {
    FeeTaskbar,
    FeeRadioGroup,
    FeeInput,
    FeeStyledForm,
    FormRow,
    StyledFormCell,
    FeeDatePicker,
    FilterableComboBox,
    WrapperForm,
    feeProperty,
    feeOptions,
} from "react-class-custom-form";

// other

// logic component
import * as FeeFormHelper from "./FeeFormHelper";

class QueryFormBody extends React.Component {

    render() {

        const {formRef, othersRateData} = this.props;
        const {handleChange, getFormErrMsg} = this.props.formFuncs;
        const {queryInfo, warnMessages, errMessages, validateMessages} = this.props.formData;
        const messages = {warnMessages, errMessages, validateMessages};

        return (
            <FeeStyledForm
                onRef={formRef}
                fieldMapper={FeeFormHelper.fieldMapper}
                alertMessage={getFormErrMsg()}
            >

                <FormRow>
                    <StyledFormCell
                        widthWeight={{md: 4}}
                        cellStatus={feeProperty.cellStatus.required}
                        title='貨棧別'
                    >
                        <FeeRadioGroup
                            defaultValue={'C'}
                            onChange={handleChange('cargoLocationObj')}
                            data={[
                                {show: '台北', code: 'C'},
                                {show: '高雄', code: 'K'}
                            ]}
                        />
                    </StyledFormCell>
                    <StyledFormCell
                        widthWeight={{md: 4}}
                        cellStatus={feeProperty.cellStatus.editable}
                        title='生效日期'
                    >
                        <FeeDatePicker
                            defaultValue={new Date()}
                            onChange={handleChange('effectDate')}
                        />
                    </StyledFormCell>
                </FormRow>

                <FormRow>
                    <StyledFormCell
                        widthWeight={{md: 4}}
                        cellStatus={feeProperty.cellStatus.editable}
                        title='客戶類別'
                    >
                        <FilterableComboBox
                            data={feeOptions.customerType02Options}
                            defaultValue={{code: '0', show: '全部'}}
                            onChange={handleChange('custTypeObj')}
                        />
                    </StyledFormCell>
                    <StyledFormCell
                        widthWeight={{md: 8}}
                        cellStatus={feeProperty.cellStatus.editable}
                        title='客戶編號'
                    >
                        <FeeInput
                            onChange={handleChange('custId')}
                        />
                    </StyledFormCell>
                </FormRow>

            </FeeStyledForm>
        )
    }

}

class QueryForm extends React.Component {

    defaultData = {
        cargoLocation: 'C',
    };

    renderFormBody = ({props, formFuncs, formData}) => {

        return formFuncs && <QueryFormBody {...props} {...this.props} formFuncs={formFuncs} formData={formData}/>
    };

    render() {

        return (
            <WrapperForm
                ref={this.props.onRef}
                getFormBody={this.renderFormBody}
                defaultData={this.defaultData}
                getNewData={FeeFormHelper.getNewData}
            />
        )
    }

}

class SampleQuery extends React.Component {

    queryFormRef;

    handleSearchClick = () => this.queryFormRef && this.queryFormRef.formValidate() && console.log('form validate success !!!');

    render() {

        return (
            <>
                <FeeTaskbar
                    buttons={[
                        {
                            name: '查詢',
                            onClick: this.handleSearchClick,
                        },
                    ]}
                />
                <QueryForm

                    othersRateData={[
                        {
                            chargeType: 'A01', // 費率代碼
                            chargeDesc: '一般'  // 費率名稱
                        }
                    ]}

                    onRef={(queryFormRef) => this.queryFormRef = queryFormRef}/>
            </>
        );
    }
}

export default SampleQuery;
