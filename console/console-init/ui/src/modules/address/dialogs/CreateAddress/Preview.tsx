/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Title,
  PageSection,
  PageSectionVariants,
  TooltipPosition,
  Tooltip,
  Button,
  ButtonVariant
} from "@patternfly/react-core";
import { Loading } from "use-patternfly";
import { useQuery } from "@apollo/react-hooks";
import { OutlinedCopyIcon } from "@patternfly/react-icons";
import { StyleSheet, css } from "aphrodite";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { ADDRESS_COMMAND_PREVIEW_DETAIL } from "graphql-module/queries";

export interface IAddressPreview {
  name?: string;
  type?: string;
  plan?: string;
  topic?: string;
  namespace: string;
  addressspace: string;
}

const Style = StyleSheet.create({
  left_padding: {
    paddingLeft: 32
  },
  bottom_padding: {
    paddingBottom: 16
  }
});

export const PreviewAddress: React.FunctionComponent<IAddressPreview> = ({
  name,
  type,
  plan,
  topic,
  namespace,
  addressspace
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { data, loading } = useQuery(ADDRESS_COMMAND_PREVIEW_DETAIL, {
    variables: {
      a: {
        metadata: {
          namespace: namespace
        },
        spec: {
          plan: plan ? plan.toLowerCase() : "",
          type: type ? type.toLowerCase() : "",
          ...(topic && topic.trim() !== "" && { topic: topic }),
          address: name
        }
      },
      as: addressspace
    }
  });

  if (loading) return <Loading />;

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Title headingLevel="h2" size="3xl" style={{ marginBottom: 32 }}>
        Review your configuration
      </Title>
      <Title headingLevel="h2" size="xl" style={{ marginBottom: 32 }}>
        {" "}
        Review the information below and click Finish to create the new address.
        Use the Back button to make changes.
      </Title>
      <Grid>
        <GridItem
          span={5}
          style={{
            borderRight: "0.1em solid",
            borderRightColor: "lightgrey"
          }}
        >
          <Grid>
            {name && name.trim() !== "" && (
              <>
                <GridItem span={4} style={{ marginBottom: 16, marginRight: 5 }}>
                  Address name
                </GridItem>
                <GridItem
                  id="preview-addr-name"
                  aria-label="preview name"
                  span={8}
                >
                  {name}
                </GridItem>
              </>
            )}
            {type && type.trim() !== "" && (
              <>
                <GridItem span={4} style={{ marginBottom: 16, marginRight: 5 }}>
                  Type
                </GridItem>
                <GridItem
                  id="preview-addr-type"
                  aria-label="preview type"
                  span={8}
                >
                  {type}
                </GridItem>
              </>
            )}
            {plan && plan.trim() !== "" && (
              <>
                <GridItem span={4} style={{ marginBottom: 16, marginRight: 5 }}>
                  Plan
                </GridItem>
                <GridItem
                  id="preview-addr-plan"
                  aria-label="preview plan"
                  span={8}
                >
                  {plan}
                </GridItem>
              </>
            )}
            {topic && topic.trim() !== "" && (
              <>
                <GridItem span={4} style={{ marginBottom: 16, marginRight: 5 }}>
                  Topic
                </GridItem>
                <GridItem
                  id="preview-addr-topic"
                  aria-label="preview topic"
                  span={8}
                >
                  {topic}
                </GridItem>
              </>
            )}
          </Grid>
        </GridItem>
        <GridItem span={7} className={css(Style.left_padding)}>
          <Title
            headingLevel="h2"
            size="lg"
            className={css(Style.bottom_padding)}
          >
            {`Configuration details  `}
            <Tooltip
              id="preview-addr-feedback-tooltip"
              aria-label="Feedback for successfully copying to clipboard"
              position={TooltipPosition.top}
              enableFlip={false}
              trigger={"manual"}
              content={<div>Successfully copied to the clipboard</div>}
              isVisible={isCopied}
            >
              <span>
                <Tooltip
                  id="preview-addr-copy-tooltip"
                  aria-label="Tooltip to copy the details to clipboard"
                  position={TooltipPosition.top}
                  enableFlip={false}
                  content={
                    <div>Copy the configuration details to the clipboard</div>
                  }
                >
                  <Button
                    id="preview-addr-copy-configuration-button"
                    variant={ButtonVariant.link}
                    aria-label="copy configuration"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        data && data.addressCommand
                      );
                      setIsCopied(true);
                    }}
                    onMouseLeave={() => {
                      setIsCopied(false);
                    }}
                  >
                    <OutlinedCopyIcon id="preview-addr-copy-button" size="md" />
                  </Button>
                </Tooltip>
              </span>
            </Tooltip>
          </Title>
          <AceEditor
            mode="xml"
            theme="github"
            fontSize={14}
            readOnly={true}
            value={data && data.addressCommand}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            style={{
              width: 700,
              border: "1px solid",
              borderColor: "lightgrey"
            }}
          />
        </GridItem>
      </Grid>
    </PageSection>
  );
};
