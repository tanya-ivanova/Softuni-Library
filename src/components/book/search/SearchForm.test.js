import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageContext } from "../../../contexts/LanguageContext";
import SearchForm from './SearchForm';

describe('SearchForm', () => {
    const mockOnSearch = jest.fn();
    const mockOnSearchCriteriaChange = jest.fn();
    const mockChangeValueHandler = jest.fn();

    const props = {
        onSearch: mockOnSearch,
        criteria: 'title',
        onSearchCriteriaChange: mockOnSearchCriteriaChange,
        search: '',
        changeValueHandler: mockChangeValueHandler,
        showOptionGenre: true,
    };

    test('renders the form with correct elements', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <SearchForm {...props} />
            </LanguageContext.Provider>
        );
        
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('What are you looking for?')).toBeInTheDocument();
        expect(screen.getByText('Search by:')).toBeInTheDocument();        
    });

    test('calls the onSearch function when submit button is clicked', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <SearchForm {...props} />
            </LanguageContext.Provider>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(mockOnSearch).toHaveBeenCalled();
    });

    test('calls the onSearchCriteriaChange function when dropdown value changes', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <SearchForm {...props} />
            </LanguageContext.Provider>
        );

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'author' } });
        expect(mockOnSearchCriteriaChange).toHaveBeenCalled();
    });

    test('calls the changeValueHandler function when search input value changes', () => {
        render(
            <LanguageContext.Provider value={{
                language: 'english',          
                setAppLanguage: () => {}          
            }}>
                <SearchForm {...props} />
            </LanguageContext.Provider>
        );

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Harry Potter' } });
        expect(mockChangeValueHandler).toHaveBeenCalled();
    });
});