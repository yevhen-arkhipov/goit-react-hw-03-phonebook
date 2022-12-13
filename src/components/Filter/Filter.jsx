import PropTypes from 'prop-types';
import id from 'utils/nanoid';
import { FilterWrapper, Label, Input } from './Filter.styled';

const Filter = ({ filter, onFilter }) => {
  return (
    <FilterWrapper>
      <Label htmlFor={id.filter}>
        Find contacts by name
        <Input
          id={id.filter}
          type="text"
          value={filter}
          name="filter"
          onChange={onFilter}
        />
      </Label>
    </FilterWrapper>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
