/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import React from "react";
import { Link } from "react-router-dom";
import { FormatDistance } from "use-patternfly";
import { IRowData, sortable } from "@patternfly/react-table";
import {
  AddressSpaceStatus,
  AddressSpaceIcon
} from "./MessagingProjectFormatter";
import { IAddressSpace } from "modules/messaging-project/components/MessagingProjectList";
import { getAddressSpaceLabelForType } from "utils";

const getTableCells = (row: IAddressSpace) => {
  const tableRow: IRowData = {
    selected: row.selected,
    cells: [
      {
        header: "name",
        title: (
          <span>
            <Link
              to={`messaging-projects/${row.nameSpace}/${row.name}/${row.type}/addresses`}
            >
              {row.name}
            </Link>
            <br />
            {row.nameSpace}
          </span>
        )
      },
      {
        header: "type",
        title: (
          <span>
            <AddressSpaceIcon />
            {getAddressSpaceLabelForType(row.type)}
          </span>
        )
      },
      {
        title: <AddressSpaceStatus phase={row.phase} messages={row.messages} />
      },
      {
        title: (
          <>
            <FormatDistance date={row.creationTimestamp} /> ago
          </>
        )
      }
    ],
    originalData: row
  };

  return tableRow;
};

//TODO: Add loading icon based on status

const getActionResolver = (
  rowData: IRowData,
  onEdit: Function,
  onDelete: Function,
  onDownload: Function
) => {
  const originalData = rowData.originalData as IAddressSpace;
  const status = originalData.status;
  switch (status) {
    case "creating":
    case "deleting":
      return [];
    default:
      return [
        {
          title: "Edit",
          id: "edit-address-space",
          onClick: () => onEdit(originalData)
        },
        {
          title: "Delete",
          id: "delete-address-space",
          onClick: () => onDelete(originalData)
        },
        {
          title: "Download Certificate",
          id: "download-certificate-address-space",
          onClick: () =>
            onDownload({
              name: originalData.name,
              namespace: originalData.nameSpace
            })
        }
      ];
  }
};

const getTableColumns = [
  {
    title: (
      <span style={{ display: "inline-flex" }}>
        <div>
          Name
          <br />
          <small>Namespace</small>
        </div>
      </span>
    ),
    dataLabel: "Name / Namespace",
    transforms: [sortable]
  },
  "Type",
  "Status",
  { title: "Time created", transforms: [sortable] }
];

export { getTableCells, getActionResolver, getTableColumns };
