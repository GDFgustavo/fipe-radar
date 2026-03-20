"use client"
import {
  Document,
  Page,
  Text,
  View,
  Font,
  Image as ImagePDF
} from '@react-pdf/renderer'
import { styles } from './styles'
import logo from '../../../public/fipe-logo-black.png'
import { formatDate } from '@/utils/formatDate'
Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf',
      fontWeight: 400
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf',
      fontWeight: 600
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf',
      fontWeight: 700
    }
  ]
})

export const FipeResultPdf = () => {
  return (
    <Document>
      <Page
        size={'A4'}
        style={styles.page}
      >
        <Text style={styles.watermark}>FIPE RADAR</Text>

        <View style={styles.header}>
          <ImagePDF src={logo.src} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.title}>FIPE Radar</Text>
            <Text style={styles.subtitle}>Tabela de preços de veículos</Text>
          </View>
        </View>

        <View style={styles.reportInfo}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Data de Emissão</Text>
            <Text style={styles.infoValue}>
              {formatDate()}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Total de Veículos</Text>
            <Text style={styles.infoValue}>1</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.vehicleHeader}>
            <Text style={styles.vehicleTitle}>
              Chevrolet Vectra
            </Text>
          </View>

          <View style={styles.tableHeader}>
            <Text style={styles.tableCellHeader}>Campo</Text>
            <Text style={styles.tableCellHeader}>Valor</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Marca</Text>
            <Text style={[styles.tableCell, styles.highlightCell]}>
              Chevrolet
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Modelo</Text>
            <Text style={[styles.tableCell, styles.highlightCell]}>
              Vectra
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Ano/Combustível</Text>
            <Text style={styles.tableCell}>
              2000 Gasolina
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Código FIPE</Text>
            <Text style={styles.tableCell}>164433-7</Text>
          </View>

          <View
            style={[styles.tableRow, { backgroundColor: '#f8fafc' }]}
          >
            <Text style={[styles.tableCell, { fontWeight: 600 }]}>
              Preço
            </Text>
            <Text style={[styles.tableCell, styles.priceCell]}>
              R$ 23.600
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            Emitido por FIPE Radar • {new Date().getFullYear()} •
            Dados oficiais da tabela FIPE
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default FipeResultPdf
