import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE0D5',
  },
  header: {
    backgroundColor: '#4A3623',
    paddingVertical: 20,
    paddingTop: 50, 
    flexDirection: 'row', // I added this so the back button and title sit side-by-side
    alignItems: 'center',
    paddingHorizontal: 20, // I added this to give the back button some breathing room from the edge
  },
  backButton: {
    marginRight: 15, // I added this to create space between the back button and the title
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20, 
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fffff',
    resizeMode: 'cover',
  },
  productDesc: {
    marginLeft: 15,
    flex: 1,
  },
  descText: {
    fontSize: 12,
    color: '#333',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#4A3623',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionBtn: {
    backgroundColor: '#F3E8D6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  optionBtnActive: {
    backgroundColor: '#D1BFA6',
  },
  optionText: {
    color: '#4A3623',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#F3E8D6',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    height: 60,
    textAlignVertical: 'top',
  },
  bottomAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 30, 
    marginBottom: 20, 
    backgroundColor: '#EAE0D5',
    borderTopWidth: 1, 
    borderTopColor: '#D1BFA6',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  qtyBtn: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#C87941',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});