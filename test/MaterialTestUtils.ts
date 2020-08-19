import UserEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';

export const selectMaterialUiSelectOption = async(element: HTMLElement, optionText: string) => {
    if (!element.parentNode) {
        throw new Error('Element is not correct');
    }
    const selectButton = element.parentNode.querySelector('[role=button]');

    if (!selectButton) {
        throw new Error('UNable to find select button');
    }

    UserEvent.click(selectButton);

    const listbox = document.body.querySelector('ul[role=listbox]') as HTMLElement;

    if (!listbox) {
        throw new Error('Option does not exist');
    }

    const listItem = within(listbox).getByText(optionText);
    UserEvent.click(listItem);
}