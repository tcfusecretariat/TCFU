import { DownloadIcon } from "@sanity/icons";
import { Box, Button, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";
import { useCallback, useState } from "react";
import { useClient } from "sanity";
import {
  downloadRegistrationXlsx,
  REGISTRATION_EXPORT_QUERY,
  type RegistrationRow
} from "../lib/export-registrations";

export function ExportRegistrationsTool() {
  const client = useClient({ apiVersion: "2026-06-15" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const handleExport = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const rows = await client.fetch<RegistrationRow[]>(REGISTRATION_EXPORT_QUERY);
      setCount(rows.length);

      if (rows.length === 0) {
        setError("目前沒有報名記錄。 / No registrations found.");
        return;
      }

      downloadRegistrationXlsx(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "無法導出報名資料。");
    } finally {
      setLoading(false);
    }
  }, [client]);

  return (
    <Box padding={4}>
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Text size={2} weight="semibold">
            導出報名 Excel / Export Registrations
          </Text>
          <Text muted size={1}>
            下載所有活動報名記錄為 Excel（.xlsx）檔案，可用 Microsoft Excel、Numbers 或 Google
            Sheets 開啟。Download all event registrations as an Excel (.xlsx) file. The export
            contains personal and admin fields — handle securely and do not share with unauthorised
            people.
          </Text>
          {error ? (
            <Text size={1} tone="critical">
              {error}
            </Text>
          ) : null}
          {count !== null && !error ? (
            <Text size={1} muted>
              已導出 {count} 筆報名記錄。
            </Text>
          ) : null}
          <Flex align="center" gap={3}>
            <Button
              icon={DownloadIcon}
              text={loading ? "正在準備… / Preparing…" : "導出 Excel / Export"}
              tone="primary"
              disabled={loading}
              onClick={handleExport}
            />
            {loading ? <Spinner muted /> : null}
          </Flex>
        </Stack>
      </Card>
    </Box>
  );
}
