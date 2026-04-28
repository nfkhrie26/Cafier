import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EBE4D5' },
  header: { backgroundColor: '#4A3525', height: 90, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  itemCard: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  imageContainer: { backgroundColor: '#F5EFE1', borderRadius: 15, padding: 15, alignItems: 'center', width: 120, height: 140, justifyContent: 'center' },
  imageTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  itemImage: { width: 60, height: 60, resizeMode: 'contain' },
  itemDetails: { flex: 1, marginLeft: 20 },
  detailText: { fontSize: 12, color: '#333', marginBottom: 2 },
  itemPrice: { fontSize: 14, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyText: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 15 },
  
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
  
  paymentOption: { backgroundColor: '#F5EFE1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 15 },
  logoText: { fontSize: 14, fontWeight: 'bold', fontStyle: 'italic' },
  
  voucherButton: { backgroundColor: '#F5EFE1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 15, marginTop: 10, marginBottom: 30 },
  voucherText: { fontSize: 14, fontWeight: 'bold' },
  
  footerContainer: { marginTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalValue: { fontSize: 16, fontWeight: 'bold' },
  
  placeOrderBtn: { backgroundColor: '#C87A3F', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 15 },
  placeOrderText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  
  emptyStateContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  emptyStateTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A3525', marginTop: 20, marginBottom: 10 },
  emptyStateDesc: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30, lineHeight: 20 },
  emptyStateBtn: { backgroundColor: '#C87A3F', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  emptyStateBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  
  itemNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#33241C',
    marginBottom: 4,
  },

  voucherRow: {
    flexDirection: 'row',
    backgroundColor: '#F5EFE1',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  voucherIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBE4D5', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  voucherStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#33241C',
  },
  discountDetailText: {
    fontSize: 12,
    color: '#C87A3F',
    marginTop: 2,
  },

  paymentBox: {
    backgroundColor: '#F5EFE1', 
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: '#F5EFE1', 
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#33241C',
  },
  totalBorder: {
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 10,
    marginTop: 5,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#33241C',
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C87A3F',
  },
});