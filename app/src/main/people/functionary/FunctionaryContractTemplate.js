import React from 'react';
import StandaloneLinkSelect from '../../../generics/StandaloneLinkSelect.js';
import StandaloneNumberField from '../../../generics/StandaloneNumberField.js';
import StandaloneDateField from '../../../generics/StandaloneDateField.js';
import StandaloneTextField from '../../../generics/StandaloneTextField.js';

export default function FunctionaryContractTemplate (props) {

    return (
      <>
        <StandaloneLinkSelect {...props} property="function" label="Função" options="functionaryFunctions"/>
        <StandaloneNumberField {...props} property="monthSalary" label="Salário (/mês)"/>
        <StandaloneNumberField {...props} property="hourSalary" label="Salário (/hora)"/>
        <StandaloneDateField {...props} property="date" label="Data"/>
        <StandaloneTextField {...props} property="comment" label="Comentários"/>
      </>
    );

}
