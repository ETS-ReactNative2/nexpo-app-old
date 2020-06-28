import React, { Component } from 'react'
import { TouchableOpacity, Linking, Alert } from 'react-native'
import PropTypes from 'prop-types'
import ActionSheet from 'react-native-actionsheet'
import Icon from 'react-native-vector-icons/Feather'
import Section from '../../components/text/Section'
import DetailsScreen from '../../components/DetailsScreen'
import DisplayImage from '../../components/DisplayImage'
import TextSection from '../../components/text/TextSection'
import TextArraySection from '../../components/text/TextArraySection'
import TextSubtitleSection from '../../components/text/TextSubtitleSection'
import Button from '../../components/Button'
import ButtonBar from '../../components/ButtonBar'

const styles = {
  headerIcon: {
    paddingRight: 8
  }
}

class CompanyDetailsScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props
    navigation.setParams({ actionSheet: this.actionSheet })
  }

  removeUndefinedUrlObjects = (urlData) => {
    const formattedUrlData = []
    urlData.forEach((item) => {
      if (item.url !== '') {
        formattedUrlData.push(item)
      }
    })
    return formattedUrlData
  }

  openUrl(url) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url)
        } else {
          Alert.alert(`Could not open URL: ${this.url}`)
        }
      })
      .catch(err => Alert.alert(`Could not open URL: ${err}`))
  }

  render() {
    const {
      navigation,
      favorites,
      toggleFavorite,
      toggleChangeMap,
      toggleChangeCompany
    } = this.props
    const { params = {} } = navigation.state
    const company = navigation.state.params.item
    const { headerIcon } = styles
    let actionSheetData = [
      { title: 'Website', url: company.websiteUrl },
      { title: 'LinkedIn', url: company.linkedInUrl },
      { title: 'Facebook', url: company.facebookUrl },
      { title: 'Twitter', url: company.twitterUrl },
      { title: 'YouTube', url: company.youTubeUrl }
    ]
    actionSheetData = this.removeUndefinedUrlObjects(actionSheetData)
    const actionSheetOptions = [
      ...actionSheetData.map(item => item.title),
      'Cancel'
    ]
    const actionSheetUrls = [...actionSheetData.map(item => item.url), '']
    return (
      <DetailsScreen>
        <DisplayImage source={{ uri: company.logotypeUrl }} />

        <TextSection title={`About ${company.name}`} description={company.about} />

        {company.map !== '' && company.boothNumber !== 0 ? (
          <Section title="Find us">
            <Button
              title={`${company.map}, booth ${company.boothNumber}`}
              onPress={() => {
                toggleChangeMap(company.map)
                toggleChangeCompany(company.boothNumber)
                navigation.navigate('MapStack')
                navigation.navigate('House')
              }}
            />
          </Section>
        ) : null}

        <TextArraySection title="We offer" descriptionArray={company.weOffer.sort()} />
        <TextArraySection title="Desired programme" descriptionArray={[...new Set(company.desiredProgramme)].sort()} />
        <TextArraySection title="Desired degree" descriptionArray={company.desiredDegree.sort()} />
        <TextArraySection title="Industry" descriptionArray={[...new Set(company.industry)].sort()} />
        <TextSection title="Did you know?" description={company.didYouKnow} />

        <TextSubtitleSection
          title="Employees"
          subtitleSections={[
            { key: '0', subtitle: 'Local', description: company.employees.local },
            { key: '1', subtitle: 'Global', description: company.employees.global }
          ]}
        />

        <TextSubtitleSection
          title="Contact"
          subtitleSections={[
            { key: '0', subtitle: 'Name', description: company.contact.name },
            { key: '1', subtitle: 'Title', description: company.contact.title },
            { key: '2', subtitle: 'Email', description: company.contact.email },
            { key: '3', subtitle: 'Phone', description: company.contact.phone }
          ]}
        />
        <Section title='Links'>
          <Button title={'Find out more'} onPress={() => params.actionSheet.show()} />
        </Section>

        <ActionSheet
          ref={(ref) => {
            this.actionSheet = ref
          }}
          title="Choose an option"
          options={actionSheetOptions}
          cancelButtonIndex={actionSheetOptions.length - 1}
          onPress={(index) => {
            switch (index) {
              case actionSheetOptions.length - 1:
                break
              default:
                this.openUrl(actionSheetUrls[index])
            }
          }}
        />
      </DetailsScreen>
    )
  }
}

CompanyDetailsScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  toggleChangeMap: PropTypes.func.isRequired,
  toggleChangeCompany: PropTypes.func.isRequired
}

export default CompanyDetailsScreen
