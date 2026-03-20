import { StyleSheet } from '@react-pdf/renderer'

export const brandColors = {
  primary: '#000',
  secondary: '#1e40af',
  accent: '#000',
  lightBg: '#f8fafc',
  darkText: '#1e293b',
  lightText: '#64748b'
}

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Open Sans',
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid'
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 20
  },
  headerText: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: brandColors.primary,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 600,
    color: brandColors.lightText,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  reportInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  infoBox: {
    width: '48%'
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: brandColors.lightText,
    marginBottom: 4,
    textTransform: 'uppercase'
  },
  infoValue: {
    fontSize: 12,
    fontWeight: 400,
    color: brandColors.darkText
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 24,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
    overflow: 'hidden'
  },
  vehicleHeader: {
    backgroundColor: brandColors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  vehicleTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 700
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 10,
    fontWeight: 700,
    color: brandColors.darkText,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 400,
    color: brandColors.darkText,
    paddingVertical: 4
  },
  highlightCell: {
    fontWeight: 600,
    color: brandColors.primary
  },
  priceCell: {
    fontWeight: 700,
    color: brandColors.accent
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: brandColors.lightText,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0'
  },
  watermark: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 72,
    color: 'rgba(30, 64, 175, 0.05)',
    fontWeight: 700,
    transform: 'rotate(-30deg)'
  }
})
