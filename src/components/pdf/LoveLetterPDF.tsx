import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: '#0a0a0a',
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 28,
    color: '#d4af37',
    marginBottom: 30,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    color: '#fafafa',
    lineHeight: 1.8,
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: '#ffb6c1',
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

interface LoveLetterPDFProps {
  content: string;
  recipient: string;
}

export function LoveLetterPDF({ content, recipient }: LoveLetterPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>A Love Letter for {recipient}</Text>
          <Text style={styles.body}>{content}</Text>
          <Text style={styles.footer}>With eternal love ✨</Text>
        </View>
      </Page>
    </Document>
  );
}
