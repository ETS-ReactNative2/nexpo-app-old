import React from 'react'
import { TouchableHighlight, View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import HighListItem from './HighListItem'
import SelectStudentButton from '../SelectStudentButton'
import StarRating from 'react-native-star-rating'

const styles = {
  image: {
    height: 45,
    width: 45,
    marginHorizontal: 16,
    borderRadius: 17,
    marginVertical: 12,
  },
  viewRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
}

const { image, viewLeft, viewRight } = styles

const starRating = (rating) => (
  <StarRating
    fullStarColor={'#fab700'}
    disabled={true}
    maxStars={5}
    rating={rating}
    starSize={12}
  />
)

const SelectableStudentListItem = ({ children, navigation, item, userType }) => (
  <TouchableHighlight
    underlayColor={global.rowSelectionColor}
    onPress={() => navigation.navigate(userType, { item })}
  >
    <View>
      <HighListItem>
        <View>
          { item.profile_image == 'Not set' ?
           <Image style={image} source={require('../../../resources/img/arkadTeam/default.png')} />
           :
           <Image style={image} source={{uri: item.profile_image}} />
         }
        </View>
        {children}

        <View style={viewRight}>
          { userType == 'DetailCompany'
            ? null
            : starRating(item.rating)
          }
          <SelectStudentButton navigation={navigation} item={item} userType={userType}/>
        </View>
      </HighListItem>
    </View>
  </TouchableHighlight>
)

SelectableStudentListItem.propTypes = {
  children: PropTypes.node.isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  item: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired
}

export default SelectableStudentListItem
