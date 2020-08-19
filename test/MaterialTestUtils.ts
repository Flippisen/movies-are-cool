import UserEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';

export const selectMaterialUiSelectOption = async(element, optionText) => {
    const selectButton = element.parentNode.querySelector('[role=button]');

    UserEvent.click(selectButton);

    const listbox = document.body.querySelector('ul[role=listbox]') as HTMLElement;

    if (!listbox) {
        throw new Error('Option does not exist');
    }

    const listItem = within(listbox).getByText(optionText);
    UserEvent.click(listItem);
}